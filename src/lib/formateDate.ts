import moment from "moment";

export default function formatDate(string: string) {
  return moment(string).format("MMM Do h:mm A");
}
