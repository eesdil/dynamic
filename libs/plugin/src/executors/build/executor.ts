import { BuildAndPushExecutorSchema } from './schema';
import {
  ExecutorContext,
  parseTargetString,
  runExecutor as runNxExecutor,
} from '@nrwl/devkit';
import { logger } from 'nx/src/utils/logger';

export default async function runExecutor(
  options: BuildAndPushExecutorSchema,
  context: ExecutorContext
) {
  try {
    const { projectName } = context;
    const buildTarget = `${projectName}:${options.buildTarget}`;

    const targetDescription = parseTargetString(buildTarget);
    for await (const { success } of await runNxExecutor(
      targetDescription,
      {},
      context
    )) {
      if (!success) {
        return { success: false };
      }
    }

    return { success: true };
  } catch (e) {
    logger.error(e);
    return { success: false };
  }
}
