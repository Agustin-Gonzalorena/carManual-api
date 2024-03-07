import z from "zod";

const mySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  description: z.string({ required_error: "Description is required" }).min(3),
  brand: z.string({ required_error: "Brand is required" }).min(3),
  year: z.number({ required_error: "Year is required" }).int().positive(),
});

export function validateVehicle(object) {
  const result = mySchema.safeParse(object);
  return result;
}
