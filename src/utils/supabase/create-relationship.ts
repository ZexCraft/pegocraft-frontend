import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createRelationship(req: {
  address: string;
  parent1: string;
  parent2: string;
  isRoot: boolean;
}) {
  const { address, parent1, parent2, isRoot } = req;

  try {
    const { data: fetchedRelationship, error: fetchError } = await supabase
      .from("relationship")
      .select("*");
    console.log(fetchedRelationship);

    if (
      fetchError ||
      fetchedRelationship == null ||
      fetchedRelationship.length === 0
    ) {
      const { data, error } = supabase
        ? await supabase
            .from("relationship")
            .insert([
              {
                address,
                parent1,
                parent2,
                is_root: isRoot,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);

        return { message: "Error creating relationship" };
      }
      return {
        message: "Relationship created",
        data: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "Relationship already exists",
        resposne: fetchedRelationship[0],
      };
    }
  } catch (error) {
    console.error("Error creating relationship:", error);
    return { message: "Internal Server Error" };
  }
}
