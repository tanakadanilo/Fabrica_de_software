package com.devnari.contrataai.base;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Response<T> {

	private T data = null;
	private HttpStatus status = HttpStatus.OK;
	private List<String> erros = new ArrayList<>();
}
