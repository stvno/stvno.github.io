function raster2age(data) {
    var age = new Uint16Array(256 * 256 );

    var x, y, i, j;

    for (x = 0; x < 256; x++) {
        for (y = 0; y < 256; y++) {
            i = x + y * 256;
            j = i * 4;
            if(data[j+3]>0)
            age[i] = data[j] *256 * 256 + data[j + 1] * 256 + data[j + 2]+1599; 
            else age[i]=0;          
        }
    }

    return age;
}


function color(age, year) {

    var px = new Uint8ClampedArray(256 * 256 * 4),

      
        x, y, i;


    for (x = 0; x < 256; x++) {
        for (y = 0; y < 256; y++) {
        i = (y * 256 + x);

            buildingage  = age[i]; // age

            i = (y * 256 + x) * 4;
            if(buildingage == 0 || buildingage === undefined || buildingage > year) {
                px[i]     = 0;
                px[i + 1] = 0;
                px[i + 2] = 0;
                px[i + 3] = 0;
            } //hide
            else {
                if(buildingage < 1600) {
                    px[i]     = 0;
                    px[i + 1] = 0;
                    px[i + 2] = 0;
                    px[i + 3] = 255;
                }
                else if(buildingage < 1700) {
                    px[i]     = 136;
                    px[i + 1] = 138;
                    px[i + 2] = 133;
                    px[i + 3] = 255;
                }
                else if(buildingage < 1800) {
                    px[i]     = 92;
                    px[i + 1] = 53;
                    px[i + 2] = 102;
                    px[i + 3] = 255;
                }
                else if(buildingage < 1850) {
                    px[i]     = 117;
                    px[i + 1] = 80;
                    px[i + 2] = 123;
                    px[i + 3] = 255;
                }                
                else if(buildingage < 1900) {
                    px[i]     = 150;
                    px[i + 1] = 0;
                    px[i + 2] = 0;
                    px[i + 3] = 255;
                }
                else if(buildingage < 1950) {
                    px[i]     = 255;
                    px[i + 1] = 0;
                    px[i + 2] = 0;
                    px[i + 3] = 255;
                }

                else if(buildingage < 2000) {
                    px[i]     = 245;
                    px[i + 1] = 121;
                    px[i + 2] = 0;
                    px[i + 3] = 255;
                }

                else if(buildingage < 2050) {
                    px[i]     = 237;
                    px[i + 1] = 212;
                    px[i + 2] = 0;
                    px[i + 3] = 255;
                }
            }
            
        }
    }
    return px;
}