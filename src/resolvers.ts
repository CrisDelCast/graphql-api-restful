// import { Resolver, Query, Mutation, Arg } from 'type-graphql';
// import { createCommentSchema } as Comment from './schemas/comment.schema';

// @Resolver()
// export class UserResolver {
//   private users: User[] = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Smith' }
//   ];

//   @Query(() => User)
//   async user(@Arg('id') id: number): Promise<User | undefined> {
//     return this.users.find(user => user.id === id);
//   }
// }