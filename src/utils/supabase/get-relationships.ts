import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getRelationships(): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data: fetchedRelationships, error: fetchError } = await supabase
      .from("relationship")
      .select("*");

    console.log(fetchedRelationships);

    if (
      fetchError ||
      fetchedRelationships == null ||
      fetchedRelationships.length === 0
    ) {
      return {
        message: "Relationships does not exist",
        response: "",
      };
    } else {
      return {
        message: "Success",
        response: fetchedRelationships,
      };
    }
  } catch (error) {
    console.error("Error getting relationships:", error);
    return { message: "Internal Server Error", response: "" };
  }
}
