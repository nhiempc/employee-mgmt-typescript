type IProps = {
    children: string | JSX.Element | JSX.Element[];
};

const NoLayout = ({ children }: IProps) => {
    return <div>{children}</div>;
};
export default NoLayout;
