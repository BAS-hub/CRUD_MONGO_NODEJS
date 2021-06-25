import { route as add } from './add'
import { route as edit } from './edit'
import { route as deleted } from './delete'
import { route as get } from './get'

export const initailRoute = (app) => {
    app.use('/api/v1/add',add)
    app.use('/api/v1/edit',edit)
    app.use('/api/v1/delete',deleted)
    app.use('/api/v1/get',get)
}