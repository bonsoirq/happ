import { readFileAsURL } from 'lib/read-file/as-url';
import { readFileAsFormData } from "lib/read-file/as-form-data";

export default class ReadFile {
  static asURL (file) {
    return readFileAsURL(file)
  }

  static asFormData (file) {
    return readFileAsFormData(file)
  }
}
