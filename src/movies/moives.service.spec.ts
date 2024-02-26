import { Test, TestingModule } from '@nestjs/testing';
import { MoivesService } from './moives.service';
import {Movie} from "./entites/movies.entity";
import {NotFoundException} from "@nestjs/common";


describe('MoivesService', () => {
  let service: MoivesService;
  //test용 Movie생성
  const testMovie = {
    title:"potato",
    genres:["aa","bb"],
    year:2000
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoivesService],
    }).compile();

    service = module.get<MoivesService>(MoivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{
    it("should return an array",()=>{
       const result = service.getAll();

       expect(result).toBeInstanceOf(Array);
    });
  });
  // describe => 함수 단위로 테스트
  describe("getOne",()=>{
    // it => 무엇을 테스트 할것인가 적어주면 좋음
    it('should return a Movie' , ()=>{
      // 테스테를 위해 필요한 movie를 생성 해주는 작업
      service.createMovie(testMovie);
      // 함수의 리턴을 const로 저장
      const result:Movie  = service.getOne(1);
      // 결과 값이 있는지 없는지 확인 toBeDefined => true or false
      expect(result).toBeDefined();
      // result의 값을 가지고 id값 확인
      expect(result.id).toEqual(1);
      // 타입이 Number인지 확인 아래의 코드도 동일 작동
      expect(typeof result.year).toBe('number');
      // expect(result.year).toEqual(expect.any(Number));
    });
    //404 에러처리
    it('should throw 404 error',()=>{
      try{
        service.getOne(999);
      }catch(e){
        // e가 NotFoundException이 맞는가 확인.
        expect(e).toBeInstanceOf(NotFoundException);
        /**
         * MoivesService › getOne › 404 오류가 발생해야 합니다.
         *
         *     기대(수신).toBeInstanceOf(예상)
         *
         *     일치자 오류: 예상 값은 함수여야 합니다.
         *
         *     예상되는 유형: 숫자
         *     예상 값: NaN
         *     expect(e).toBeInstanceOf(NaN);
         */
        // 내가 생성한 에러메시지가 맞는가. 확인
        expect(e.message).toEqual('Movie with 999 not found')
      }
    });
  });

  describe("deleteOne",()=>{
    it("deleteMovie",()=>{
      service.createMovie(testMovie);
      service.createMovie(testMovie);
      // 직접 생각 한 방법
      // service.deleteOne(1);
      // try{
      //   const result = service.getOne(1);
      // }catch (e){
      //   expect(e).toBeInstanceOf(NotFoundException);
      // }
      //강의에서의 방법
      const beforeMovies = service.getAll().length;
      service.deleteOne(1);
      const afterMovies = service.getAll().length;
      //toBeLessThan 값이 reslut 값보다 큰가 비교하는 테스트 type는 bigInt | Number
      expect(afterMovies).toBeLessThan(beforeMovies);
    });
    it('should throw 404 error',()=>{
      try{
        service.deleteOne(1);
      }catch(e){
        expect(e.message).toEqual('Movie with 1 not found')
      }
    });
  });

  describe("create",()=>{
    it('should create a Movie',()=>{
      const beforeMovies = service.getAll().length;
      service.createMovie(testMovie)
      const afterMovie = service.getAll().length;
      // .toBeGreaterThan(number | bigint) => expect(value).toBeGreaterThan(20) value가 20을 초과하는가?
      // 위의 방법을 사용할 경우 1개 이상의 Movie가 추가 되는 오류의 경우 놓칠 수 있다,
      expect(afterMovie).toEqual(beforeMovies+1);
    });
  });

  describe("update",()=>{
    it('should update a Movie', ()=>{
        service.createMovie(testMovie);
        service.update(1,{
          title:"potato2",
          genres:["aa2","bb2"],
          year:2000
        });
        const afterMovie = service.getOne(1);
        expect(afterMovie.title).toEqual("potato2");
    });
    it('should update a Movie Not found error',()=>{
      try{
        service.update(2,{
          title:"potato2",
          genres:["aa2","bb2"],
          year:2000
        });
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });
});
