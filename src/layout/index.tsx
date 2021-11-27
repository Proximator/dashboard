import React, { ReactElement } from 'react';
import WebHeader from 'ui-component/web-header';

interface Props {
    children: ReactElement[] | ReactElement;
}

function Layout({ children }: Props): ReactElement {
    return (
        <>
            <WebHeader />
            <div>
                <main>{children}</main>
            </div>
        </>
    );
}
export default Layout;
