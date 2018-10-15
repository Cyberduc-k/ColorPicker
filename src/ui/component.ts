import { ThisTypedComponentOptionsWithRecordProps as TTCOWRP } from "vue/types/options";
import Vue from "vue";

export default function Component<D, C, M, P> (opts: TTCOWRP<Vue, D, C, M, P>): TTCOWRP<Vue, D, C, M, P> {
    return opts;
}