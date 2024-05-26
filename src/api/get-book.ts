import axios from "axios"
import { URL } from "./utils/ulr"
export async function getDataLibrari() {
 const response = await axios.get(URL)

 return await response.data
}