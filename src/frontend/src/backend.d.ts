import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ChatResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Message {
    content: string;
    role: MessageRole;
    timestamp: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    chat(userMessage: string): Promise<ChatResult>;
    clearHistory(): Promise<void>;
    getHistory(): Promise<Array<Message>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
