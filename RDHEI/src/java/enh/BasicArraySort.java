package enh;

//Problem Set 3 : Problem 1
public class BasicArraySort {
    public static void mainz(String[] args) {
        int[] a = { 5, 5, 2, 3, 6, 7, 5, 5, 5};
        int m = median(a);
        System.out.println("For the array : {5, 5, 2, 3, 6, 7, 5, 5, 5}, the median is "+m);
        
        System.exit(0);
    }
    //sort the array, and return the median
    public static int median(int[] a) {
        int temp;
        int asize = a.length;
        //sort the array in increasing order
        
        //insertion sort
        for (int i = 0; i < asize ; i++)
            for (int j = i; j > 0; j--)
                if (a[j] < a [j-1]) {
                    temp = a[j];
                    a[j] = a[j-1];
                    a[j-1]=temp;
                }
        
        /* one alternative way to sort
        for (int j = 1; j< asize; j++) {
            int v = a[j];
            int i = j;
            while (a[i-1]>v) {
                a[i] = a[i-1];
                i--;
                if (i<=0)
                    break;
            }
            a[i]=v;
        }
        */
        /* another alternative way to sort
        for (int i = 0; i < asize ; i++)
            for (int j = i+1; j < asize; j++)
                if (a[i] > a[j]) {
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
         */
        
        System.out.println("After sorting, the array becomes ");
        for (int i = 0; i< asize; i++)
            System.out.print(a[i]+" ");
        System.out.println();
        //if array size is odd
        if (asize%2 == 1)
            return a[asize/2];
        else //when array size is even
            return ((a[asize/2]+a[asize/2 - 1])/2);
    }
}