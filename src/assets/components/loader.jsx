
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const SpinnerContainer = styled.div`
    width: 60px;
    height: 60px;
    position: relative;
    animation: shimmer 1.5s infinite;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #ff69b4;
        border-right-color: #ff69b4;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes shimmer {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }
`;

const Loader = () => {
    return (
        <LoaderWrapper>
            <SpinnerContainer />
        </LoaderWrapper>
    );
};

export default Loader;