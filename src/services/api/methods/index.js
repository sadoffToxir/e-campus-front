import auth from './auth'
import groups from './groups'
import topics from './topics'
import comments from './comments'

export default {
  ...auth,
  ...groups,
  ...topics,
  ...comments,
}