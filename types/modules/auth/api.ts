import { z } from "zod";
import { authenticateSchema } from "./schema";

export type AuthenticatePayload = z.infer<typeof authenticateSchema>;
