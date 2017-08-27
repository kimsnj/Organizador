import {dates} from './Dates'
import {init} from '../actions/common'

test('Init from server dates', () => {
    const initial_state = dates(undefined, {type: 'INIT'})

    const server_msg = [
        {
            id: 1,
            cours: 2,
            dates: "2016-08-12"
        }, {
            id: 5,
            cours: 6,
            dates: "2016-08-12"
        }
    ]

    const expected_state = {
        "2016-08-12": [
            {
                id: 1,
                cours: 2
            }, {
                id: 5,
                cours: 6
            }
        ]
    }
})