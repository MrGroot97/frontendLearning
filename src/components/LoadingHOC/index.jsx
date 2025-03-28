import { useState, useEffect } from "react";

const BodyComponent = ({ data }) => {
    return (
        <div>
            <h1>Body Component</h1>
            <p>{data}</p>
        </div>
    );
}

const LoadingHOC = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const [isLoading, setIsLoading] = useState(true);
        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }, []);

        return <div>
            {isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />}
        </div>
    }
};

const EnhancedBodyComponent = LoadingHOC(BodyComponent);

export const HOCExample = () => {
    return <EnhancedBodyComponent data="This is the data" />;
}