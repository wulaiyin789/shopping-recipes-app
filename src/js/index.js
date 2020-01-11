// Global app controller
import Search from './models/Search';

/** Global State of the app
 * - Search object
 * - Current recipe object
 * - Liked recipe
 */
const status = {

}

const search = new Search('pizza');

console.log(search);

search.getResult();