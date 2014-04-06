/*
  bacon.c - a simple client for accessing the baconverse
*/
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main (int argc, char** argv) {
	
	//check for correct amount of arguments
	if (argc != 3) {
		printf("usage: %s location\n",argv[0]);
		exit(1);
	}

	char* location = argv[1];
	int location_int;

	char* food = argv[2];

	printf("you have chosen %s as your location and %s as your food!! \n", location,food);

	int sockfd;
	struct addrinfo hints, *res;

	//set up our own address info
	//hints = our own address
	memset(&hints, 0, sizeof hints);
	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_flags = AI_PASSIVE;  

	// get the baconverse's address info
	// res = addrinfo of wheresthebacon...
	getaddrinfo("wheresthebacon.herokuapp.com", "80", &hints, &res);

	//create a socket to the baconverse and connect
	sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
	connect(sockfd, res->ai_addr, res->ai_addrlen);
	printf("connected to %s", (char*) res->ai_addr);

	char request[512];
	int request_len = sizeof(request);

	//form a request with the location the user provided
	sprintf(request, "GET /text/%s/%s HTTP/1.1\r\nHost:%s\r\n\r\n\r\n", location,food,"wheresthebacon.herokuapp.com");

	printf("\nrequest\n%s", request);

	//send the request, and if sent correctly print out a message
	if (send(sockfd, request, request_len,0) > 0) {
		printf("successfuly sent your bacon request to the baconverse... \n");
	}

	char response[1024];
	int response_len = sizeof(response);

	//recieve the response
	if (recv(sockfd, response, response_len,0) > 0) {
		printf(response);
	}
}

char* parseResponse(char* response) {

}