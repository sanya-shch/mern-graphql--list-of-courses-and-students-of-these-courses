const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const User = require('../models/user');
const Course = require('../models/course');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLBoolean) },
        course: {
            type: CourseType,
            resolve({ courseId }, args) {
                return Course.findById(courseId);
            }
        }
    }),
});

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        users: {
            type: new GraphQLList(UserType),
            resolve({ id }, args) {
                return User.find({ courseId: id });
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return User.findById(id);
            },
        },
        course: {
            type: CourseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Course.findById(id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                return User.find({ name: { $regex: name, $options: "i" } });
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                return Course.find({ name: { $regex: name, $options: "i" } });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCourse: {
            type: CourseType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { name, code }) {
                const course = new Course({
                    name,
                    code,
                });
                return course.save();
            },
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                courseId: { type: GraphQLID },
                status: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, { name, email, courseId, status }) {
                const user = new User({
                    name,
                    email,
                    courseId,
                    status,
                });
                return user.save();
            },
        },
        deleteCourse: {
            type: CourseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Course.findByIdAndRemove(id);
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return User.findByIdAndRemove(id);
            }
        },
        updateCourse: {
            type: CourseType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, name, code }) {
                return Course.findByIdAndUpdate(
                    id,
                    { $set: { name, code } },
                    { new: true },
                );
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                courseId: { type: GraphQLID },
                status: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, { id, name, email, courseId, status }) {
                return User.findByIdAndUpdate(
                    id,
                    { $set: { name, email, courseId, status } },
                    { new: true },
                );
            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});