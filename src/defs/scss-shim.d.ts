declare module "*.scss" {
    interface IStyleMap {
        [styleName: string]: string;
    }

    const styleMap: IStyleMap;    
    export = styleMap;
}