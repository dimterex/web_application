import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getLogSourcesAsync, selectLogSources } from "../components/logger/loggerSlice";
import { LogSourcesView } from "../components/logger/logSourcesView";
import { LogSelectedSourceView } from "../components/logger/logSourceView";

export function LoggerView() {

    const dispatch = useAppDispatch();
    // dispatch(getLogSourcesAsync())

    return <div className='grid-container'>
        <LogSourcesView classes='grid-child' />
        <LogSelectedSourceView classes='grid-child'/>
    </div>
}
