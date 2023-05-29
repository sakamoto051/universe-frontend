import { getToken } from '../../functions/CommonProvider'

export const CSRFToken = () => {
    const csrfToken = getToken();
    return (
        <input type="hidden" name="_token" value={csrfToken} />
    )
}