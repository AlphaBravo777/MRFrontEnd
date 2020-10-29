import { IBatchInfo, IBatchInfoBackend } from './production.interface';

export function factory_batches_frontendToBackend(frontendBatches: IBatchInfo[]): IBatchInfoBackend[] {
    const backendBatchArray: IBatchInfoBackend[] = []
    frontendBatches.forEach(batch => {
        const backendBatch: IBatchInfoBackend = {
            id: batch.id,
            day: batch.dayNumber,
            weeknumber: batch.weekNumber,
            year: batch.year
        }
        backendBatchArray.push(backendBatch)
    });
    return backendBatchArray
}

export function factory_batches_backendToFrontend(backendBatches: IBatchInfoBackend[]): IBatchInfo[] {
    const frontendBatchArray: IBatchInfo[] = []
    backendBatches.forEach(batch => {
        const backendBatch: IBatchInfo = {
            id: batch.id,
            dayNumber: batch.day,
            weekNumber: batch.weeknumber,
            year: batch.year
        }
        frontendBatchArray.push(backendBatch)
    });
    return frontendBatchArray
}