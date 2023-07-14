export abstract class BasicRepository<R, C, U> {
  abstract create(createDto: C): Promise<R>;
  abstract findAll(): Promise<R[]>;
  abstract findOne(identifier: any): Promise<R | null>;
  abstract update?(identifier: any, updateDto: U): Promise<R | null>;
  abstract remove?(identifier: any): Promise<void>;
}
