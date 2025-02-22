function ErrorMessage(errorMessage) {
    errorMessage = errorMessage.errorMessage;
    return (
        <h1 className='errorMessage'>{ errorMessage }</h1>
    );
}

export default ErrorMessage;