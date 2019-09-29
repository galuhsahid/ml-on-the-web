# Klasifikasi Gambar dengan ml5.js

## Unggah gambar
![screencap-unggah](klasifikasi-gambar-1.gif)

## Webcam
![screencap-webcam](klasifikasi-gambar-2.gif)

1. Pilih model yang ingin Anda gunakan. Terdapat tiga model yang dapat dipilih: [MobileNet](https://arxiv.org/abs/1704.04861), [Darknet](https://github.com/pjreddie/darknet), dan Darknet-tiny.
2. Anda dapat memprediksi gambar dengan dua cara: mengunggah gambar atau menggunakan *webcam*. Apabila Anda ingin mengunggah gambar, simpan gambar di direktori `/images` terlebih dahulu.
3. Klik tombol Prediksi untuk mengeluarkan prediksi model terhadap gambar. Selain prediksi label, akan muncul nilai *confidence* yang menunjukkan seberapa besar model percaya bahwa gambar yang kita unggah/gambar yang tertangkap di *webcam* adalah label yang ditebak.