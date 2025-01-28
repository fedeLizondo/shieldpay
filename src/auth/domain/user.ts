import { UUID } from "crypto";

export class User {
  constructor(
    public readonly id: UUID,
    public readonly email: string,
    public readonly password: string,
  ) {}
}