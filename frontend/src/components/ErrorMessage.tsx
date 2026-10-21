const getErrorMessage = async ( err: unknown ): Promise<string> => {
    if ( typeof err === 'object' || err !== null ) {
        const e = err as { data?: { message?: string }, error?: string, message?: string };
        return e.data?.message || e.error || e.message || 'Something went wrong';
    }
    return 'Something went wrong';
}

export default getErrorMessage;