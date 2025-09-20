package com.contactkeeper.utils;
// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class GenerateJwtSecret {
   public static void main(String[] var0) throws NoSuchAlgorithmException {
      KeyGenerator var1 = KeyGenerator.getInstance("HmacSHA256");
      var1.init(256);
      SecretKey var2 = var1.generateKey();
      String var3 = Base64.getEncoder().encodeToString(var2.getEncoded());
      System.out.println("Base64 Key: " + var3);
      StringBuilder var4 = new StringBuilder();
      byte[] var5 = var2.getEncoded();
      int var6 = var5.length;

      for(int var7 = 0; var7 < var6; ++var7) {
         byte var8 = var5[var7];
         var4.append(String.format("%02X", var8));
      }

      System.out.println("Hex Key: " + var4.toString());
   }
}




// Run commands:
// $ javac GenerateJwtSecret.java
// java GenerateJwtSecret