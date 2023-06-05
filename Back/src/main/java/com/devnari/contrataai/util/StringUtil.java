package com.devnari.contrataai.util;

public class StringUtil {

	public static String tratarObjectNull(Object obj) {
		if (obj == null) {
			return "";
		}
		if (obj.toString().equalsIgnoreCase("null")) {
			return "";
		}
		return obj.toString();
	}

	public static String tratarStringNull(String string) {
		return StringUtil.tratarObjectNull(string);
	}

	public static String tratarStringUndefined(String string) {
		string = StringUtil.tratarStringNull(string);
		if (string.equalsIgnoreCase("undefinned")) {
			return "";
		}
		return string;
	}

	public static String tratarStringNullEUndefinned(String string) {
		return StringUtil.tratarStringUndefined(string);
	}

	public static String tratarObjectNullEUndefinned(Object obj) {
		String string = StringUtil.tratarObjectNull(obj);
		return StringUtil.tratarStringNullEUndefinned(string);
	}

	public static Long converterStringParaLong(String numero) throws Exception {

		numero = StringUtil.tratarStringNullEUndefinned(numero);
		Long inteiro = null;
		try {
			inteiro = Long.parseLong(numero);
		} catch (Exception e) {
			throw new Exception("O Número '" + numero + "' é inválido!");
		}

		return inteiro;
	}

	public static Double converterStringParaDouble(String numero) throws Exception {

		numero = StringUtil.tratarStringNullEUndefinned(numero);
		Double inteiro = null;
		try {
			inteiro = Double.parseDouble(numero);
		} catch (Exception e) {
			throw new Exception("O Número '" + numero + "' é inválido!");
		}

		return inteiro;
	}
}
