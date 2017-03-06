<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*, java.net.*"%>
<%@ page import="java.util.Map.Entry"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Properties properties = new Properties();
String realpath = request.getRealPath("/");
BufferedReader br = null;
BufferedReader br1 = null;
BufferedInputStream br2 = null;
HttpURLConnection con = null;  
DataOutputStream dataOut = null; 
BufferedOutputStream bos = null;
PrintWriter pw = null;
String fileName = null;
String visitType = null;
try{  
	String urlParam = request.getParameter("url");
	//读取配置文件
	FileInputStream in = new FileInputStream(realpath+"/url.properties");  
	properties.load(in);  
	//request.getRequestDispatcher(properties.getProperty("url") + url).forward(request, response);
	//response.sendRedirect(properties.getProperty("url") + url);
	
	Map<String, Object> params = new HashMap<String, Object>();
	br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));  
    String temp;  
        StringBuffer content = new StringBuffer();
        while ((temp = br.readLine()) != null) {  
        	content.append(temp);  
        }  
		Enumeration pns = request.getParameterNames();
		while (pns.hasMoreElements()){
			String pn = (String) pns.nextElement();
			params.put(pn, request.getParameter(pn));
			//System.out.print(request.getParameter(pn));
		}
		StringBuffer resultBuffer = null;  
	    // 构建请求参数  
	    
	    StringBuffer sbParams = new StringBuffer();  
	    if (params != null && params.size() > 0) {  
	        for (Entry<String, Object> entry : params.entrySet()) {  
	        	if("fileName".equals(entry.getKey())){
	        		fileName=(String)entry.getValue();
	        		continue;
	        	}
	        	if("visitType".equals(entry.getKey())){
	        		visitType=(String)entry.getValue();
	        		continue;
	        	}
	        	if("url".equals(entry.getKey())){
	        		continue;
	        	}
	            sbParams.append(entry.getKey());  
	            sbParams.append("=");  
	            sbParams.append(entry.getValue());  
	            sbParams.append("&");  
	        }  
	    }
	    String paramsData = sbParams.toString().replaceAll(" ", "%20");
	    // 发送请求  
    	URL url = null;  
        if (sbParams != null && sbParams.length() > 0) {  
            url = new URL(properties.getProperty("url") + urlParam + "?" + paramsData.substring(0, paramsData.length() - 1));  
        } else {  
            url = new URL(properties.getProperty("url") + urlParam);  
        }
        con = (HttpURLConnection)url.openConnection();  
        con.setRequestMethod("POST");  
        con.setDoOutput(true);  
        con.setDoInput(true);  
        con.setUseCaches(false);  
        con.setRequestProperty("Content-Type", "application/json;");  
        
        dataOut = new DataOutputStream(con.getOutputStream());  
        dataOut.write(content.toString().getBytes("UTF-8"));
        dataOut.flush();
        // 读取返回内容  
        if("down".equals(visitType)){
        	br2 = new BufferedInputStream(con.getInputStream());
			response.reset();
			response.setContentType("application/x-download");
			response.setHeader("Content-Disposition", "attachment; filename="+fileName);
			bos = new BufferedOutputStream(response.getOutputStream());
			int size = 0;
			int len = 0;
			byte[] buf = new byte[1024];
			while ((size = br2.read(buf)) != -1) {
			       len += size;
			       bos.write(buf, 0, size);
			}
			out.clear();  
			out = pageContext.pushBody();  
        }else{
	        resultBuffer = new StringBuffer();  
	            br1 = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));  
	            String temp1;  
	            while ((temp1 = br1.readLine()) != null) {  
	                resultBuffer.append(temp1);  
	            }  
	        pw = response.getWriter();
	        pw.write(resultBuffer.toString());
	        pw.flush();
        }
        
}  
catch(Exception e){  
	e.printStackTrace();
    out.println(e);  
}finally {  
    if (dataOut != null) {  
        try {  
        	dataOut.close();  
        } catch (IOException e) {  
        	dataOut = null;  
            throw new RuntimeException(e);  
        } finally {  
            if (con != null) {  
                con.disconnect();  
                con = null;  
            }  
        }  
    } 
    if (bos != null) {
		try {
			bos.close();
		} catch (IOException e) {
			bos = null;
			throw new RuntimeException(e);
		} finally {
			if (con != null) {
				con.disconnect();
				con = null;
			}
		}
	}
    if (br != null) {  
        try {  
            br.close();  
        } catch (IOException e) {  
            br = null;  
            throw new RuntimeException(e);  
        } finally {  
            if (con != null) {  
                con.disconnect();  
                con = null;  
            }  
        }  
    } 
    if (br2 != null) {
		try {
			br2.close();
		} catch (IOException e) {
			br2 = null;
			throw new RuntimeException(e);
		} finally {
			if (con != null) {
				con.disconnect();
				con = null;
			}
		}
	}
    if (pw != null){
    	try{
    		pw.close();
    	}catch(Exception e){
    		pw = null;
    		e.printStackTrace();
    	}
    }
}  

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'dispacher.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  </body>
</html>
