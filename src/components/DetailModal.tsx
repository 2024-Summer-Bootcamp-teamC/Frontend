import React from 'react';
import BiographyBg from '../assets/images/BiographyBg.png';
import BlueTapeRow from '../assets/images/BlueTapeRow.png';

const DetailModal: React.FC = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm" />
      <div
        className="w-[30%] h-[700px] bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url(${BiographyBg})` }}
      >
        <div
          className="w-[40%] h-[100px] bg-no-repeat bg-contain absolute -top-[30px] left-[30%]"
          style={{ backgroundImage: `url(${BlueTapeRow})` }}
        />
        <div className="flex flex-col text-[1.4rem] m-10">
          <div>
            <span>생애 : </span>
            <span>{'1893 ~ 2989'}</span>
          </div>
          <div>
            <span>시대 : </span>
            <span>{'조선시대'}</span>
          </div>
          <div>
            <span>일대기 : </span>
            <span>
              {
                '영웅소설은 주인공의 영웅적 일대기를 서사의 기본골격으로 하는 고전소설이다. 보통사람보다 탁월한 능력을 가진 사람으로서 개인보다는 자신이 속한 집단의 이익과 행복을 위하여 위대한 일을 수행하고, 그 결과 집단의 추앙을 받게 되는 영웅을 그린 소설이다. 영웅의 일생은 고구려 건국신화의 서사구조를 따랐고, 임진왜란과 병자호란을 거친 조선후기에 영웅소설들이 대거 출현했다. 영웅 출현 기대에 부응하여 생겨난 이 소설은 주로 한글로 쓰였고 필사본·인쇄본으로 유통되었다. 18세기에 출현하여 19세기에 크게 유행했으며 20세기 초까지 계속 창작되고 출판되었다.'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
