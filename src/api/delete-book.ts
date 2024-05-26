import axios from "axios";
import { URL } from "./utils/ulr";

export async function DeleteBook(id: string) {
  const response = await axios.delete(`${URL}/${id}`);

  console.log(response.data);
}
