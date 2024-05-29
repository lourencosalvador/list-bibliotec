import axios from "axios";
import { URL } from "./utils/ulr";
import { librariProps } from "./types";
export async function postBook(data: librariProps) {
  
  const response = await axios.post(URL, {
    id: data.id,
    name: data.name,
    autorname: data.autorname,
    price: data.price,
  });

  console.log(response.status);
}
