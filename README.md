http://localhost:3000/beer
http://localhost:3000/beer/Jever

how to build:
docker build -t marcwiederh247/beerapi .
then:
docker run -p 3000:3000 marcwiederh247/beerapi

publish to docker hub:
docker tag marcwiederh247/beerapi marcwiederh247/beerapi:1
docker push marcwiederh247/beerapi:1