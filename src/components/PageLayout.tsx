import React, { ReactNode, useImperativeHandle, useRef } from "react";
import { Page } from "zmp-ui";
import { PageProps } from "zmp-ui/page";
import DefaultHeader from "./DefaultHeader";

interface PropsType extends PageProps {
    children?: ReactNode;
    title?: string;
    customHeader?: ReactNode;
    name?: string;
    restoreScroll?: boolean;
    restoreScrollBackOnly?: boolean;
    bg?: string;
}

const PageLayout = React.forwardRef<HTMLDivElement, PropsType>((props, ref) => {
    const {
        title,
        children,
        customHeader,
        restoreScrollBackOnly = true,
        restoreScroll,
        bg,
        ...rest
    } = props;
    const pageRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => pageRef.current as HTMLDivElement);

    return (
        <Page
            {...rest}
            restoreScroll={restoreScroll}
            restoreScrollOnBack={restoreScrollBackOnly}
            ref={pageRef}
            className="page-layout"
            style={bg ? { backgroundColor: bg } : undefined}
        >
            {customHeader || <DefaultHeader title={title} />}
            {children}
            <br />
            <br />
        </Page>
    );
});

export default PageLayout;