import Post,{PostDocument,PostInput} from "../models/postModel";

class PostService {
  // Crear un nuevo post
  public async create(postInput: PostInput): Promise<PostDocument> {
    try {
      const post = await Post.create(postInput);
      return post;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los posts
  public async findAll(): Promise<PostDocument[]> {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un post por ID
  public async findById(id: string): Promise<PostDocument | null> {
    try {
      const post = await Post.findById(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un post por ID
  public async update(id: string, postInput: PostInput): Promise<PostDocument | null> {
    try {
      const post: PostDocument | null = await Post.findOneAndUpdate(
        { _id: id },
        postInput,
        { returnOriginal: false }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un post por ID
  public async delete(id: string): Promise<PostDocument | null> {
    try {
      const post: PostDocument | null = await Post.findOneAndDelete({ _id: id });
      return post;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();
