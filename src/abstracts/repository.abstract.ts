export abstract class AbstractRepository<R, C, U> {
  abstract create(createBookDto: C): Promise<R | null>;
  abstract findAll(): Promise<R[]>;
  abstract findOne(ISBN: string): Promise<R | null>;
  abstract update(ISBN: string, updateBookDto: U): Promise<R | null>;
  abstract remove(ISBN: string): Promise<void>;
  abstract removeAll(): Promise<void>;
}
