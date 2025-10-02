// 배너, Top1, Top2, Top3 같은 섹션 재사용 용도

import { cx } from './cx';
import type { ReactNode } from 'react';

interface section {
  children: ReactNode; //섹션의 본문(포스터, 정보 등)
}

export const Section = ({children }: section) => {
  return (
    <section
      className={cx(
        'flex flex-col', //해당 요소를 flex 컨테이너로 만들고, 주축을 column으로 설정
        'gap-4', //자식 요소들 사이 간격
        'p-4', //내부 여백
        'min-h-[740px] md:min-h-[1080px]' //모바일, PC 높이 기준
      )}
    >
      <div className="flex-1 flex flex-col gap-4">{children}</div> {/*데스크탑 가로 배치 시 영역 확장됨 */}
    </section>
  );
};