import { ErrorRequestHandler } from 'express';
import { treeifyError, z } from 'zod/v4';

z.config({
  customError: (issue) => {
    if (issue.code === 'invalid_type') {
      return `잘못된 타입, ${issue.expected} 타입이 필요합니다.`;
    }
    if (issue.code === 'too_small') {
      if (issue.origin === 'string') {
        return `${issue.minimum} 글자 이상을 입력해주세요.`;
      }
    }
    if (issue.code === 'too_big') {
      if (issue.origin === 'string') {
        return `${issue.maximum} 글자 이하로 입력해주세요.`;
      }
    }
    if (issue.code === 'custom') {
      return `less-than-${(issue.params || {}).minimum}`;
    }
  },
});
z.config(z.locales.ko());

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('error', err);

  if (err instanceof z.ZodError) {
    console.log('err of zod error', JSON.stringify(err, null, 2));
    const formattedError = treeifyError(err);
    console.log('formattedError', JSON.stringify(formattedError, null, 2));
    res.status(400).json({
      errors: formattedError,
    });
  } else {
    res.status(400).json({
      errors: { errors: [err.message] },
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
};
