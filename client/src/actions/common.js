/*
 * Action type common to all reducers
 */
export const INIT = 'INIT';

/*
 * Creator
 */

export const init = data => ({
    type: INIT,
    data
});