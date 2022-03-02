import { ADD_FAVORITE } from "./mutations"

export default function addFavorite(id) {
    const [favorite, { error, data }] = useMutation(ADD_FAVORITE);

}