interface ButtonProps {
    type: ButtonType;
    text?: string;
    icon?: any;
    onClick: any;
}

export enum ButtonType {
    tableControl = 'tableControl',
    alert = 'alert',
}

export default function Button(props: ButtonProps) {
    return (
        <div className={`button ${props.type}`} onClick={props.onClick}>
            {props.text}
        </div>
    );
}