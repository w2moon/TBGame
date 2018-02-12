declare namespace log{
    /**
     * 打印错误信息，必须要处理，不应该出现
     * @param message 消息字符
     * @param optionalParams 可选参数
     */
    export function e(message?: any, ...optionalParams: any[]): void;
    /**
     * 打印一般信息，正常打印
     * @param message 消息字符
     * @param optionalParams 可选参数
     */
    export function i(message?: any, ...optionalParams: any[]): void;
    /**
     * 打印警告信息，可能有问题的地方，不一定要处理
     * @param message 消息字符
     * @param optionalParams 可选参数
     */
    export function w(message?: any, ...optionalParams: any[]): void;
}
