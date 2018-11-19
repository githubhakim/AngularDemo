using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyKitchen.Web.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class AlgorithmsController : ControllerBase
    {

        int[] GetMaxSequence(int[] list)
        {
            var result = new List<int>();

            //sort items 
            
            List<int> sortedList = list.ToList();
            sortedList.Sort();

            // check if two items in a sequence has a difference of 1 , then add to result 
            for (int i = 0; i < sortedList.Count ; i++)
            {

                if (i+1 < sortedList.Count &&  sortedList[i + 1] - sortedList[i] == 1)
                {
                    result.Add(sortedList[i]);

                }
                else
                {
                    result.Add(sortedList[i]);
                    break;
                }

                


            }
            
            return result.ToArray();
        }

        int[] ReverseInPlace(int[] arr)
        {

            string ss= "";
            var vv = ss.ToArray();
            
            for (int i = 0, x = arr.Length-1; i < x; i++, x--)
            {
                var temp = arr[x];
                arr[x] = arr[i];
                arr[i] = temp;
            }

            return arr;
        }
        


        [HttpGet("[action]")]
        public void tryTypes()
        {
            GetMaxSequence(new int[] { 3, 5, 2, 9, 8, 1 });
            GetMostCommonNumber2(new int []{ 4,3,4,3,5,4,6,7});

            Queue<string> q = new Queue<string>();
            q.Enqueue("ffdf");
            q.Contains("item");

            // lst grouping 
            List<string> lst = new List<string>();
            lst.Add("first");
            lst.Add("second");
            lst.Add("");
            lst.Add("");


            var lookup = lst.GroupBy<string, string>(item =>
            {
                if (item == "")
                    return "x";
                else
                    return "y";
            });

            object ddd;
            foreach (var item in lookup)
            {
                foreach (var dot in item)
                    ddd = dot;
            }



            var secondList = new List<string>();
            secondList.Add("second");
            secondList.Add("third");
            secondList.Add("forth");
            //
            var interectResult = lst.Intersect<string>(secondList);

            var orderByResult = lst.OrderByDescending(item => item);

            var minResult = lst.Min();

            secondList.Reverse();

            var result = secondList.Select(item => item.StartsWith("sec"));

            var whereResult = secondList.Where(item => item.StartsWith("third"));

            var unionResult = secondList.Union(lst);


            //  
            Dictionary<string, string> dictionary = new Dictionary<string, string>();

            dictionary.Add("f", "first");
            dictionary.Add("s", "second");
            dictionary.Add("th", "third");

            HashSet<int> hashSet = new HashSet<int>();
            hashSet.Add(2);
            hashSet.Add(3);
            hashSet.Add(4);
            hashSet.Add(5);

            HashSet<int> secondSet = new HashSet<int>();
            secondSet.Add(3);
            secondSet.Add(4);
            var orderByHashSet = hashSet.OrderBy(item => item);
            bool isSuper = hashSet.IsSupersetOf(secondSet);

            int[] ar = new int[hashSet.Count];
            
            hashSet.CopyTo(ar);
            var lstOfArray = ar.ToList();

            int[] lstCopy = (int[]) ar.Clone();

            SortedDictionary<int, int> sortedDictionary = new SortedDictionary<int, int>();
            sortedDictionary.Add(4,4);
            sortedDictionary.Add(7,7);
            sortedDictionary.Add(1,1);
            

            SortedSet<int> sortedSet= new SortedSet<int>();
            sortedSet.Add(4);
            sortedSet.Add(2);
            sortedSet.Add(77);

            

            foreach (var item in sortedSet)
            {

            }





        }

        int GetMostCommonNumber2(int[] list)
        {
            var valuesCount = new Dictionary<int, int>();

            for (int i = 0; i < list.Length; i++)
            {
                if (valuesCount.Keys.Contains(list[i]))
                    valuesCount[list[i]] += 1;
                else
                    valuesCount.Add(list[i], 1);

            }


            var max = valuesCount.Max(item => item.Value );
            var keyMax = valuesCount.Keys.Max();
            var valueMax = valuesCount.Values.Max();

            foreach (KeyValuePair<int,int> item in valuesCount)
            {
                if (item.Value > max)
                    max = item.Key; 
            }
        
            return max;
        }


        public int[] PutEvenNumberFirst(int[] list)
        {
            //declare oddNumbers array 
            List<int> oddLocatinos = new List<int>();

            // check input 
            if (list != null && list.Length > 0)
            {

                //iterate over list 
                for (int i = 0; i < list.Length; i++)
                {
                    //add odd items to list 
                    if (list[i] % 2 != 0)
                        oddLocatinos.Add(i);

                }

                
                

                var temp = 0;
                //iterate over odd numbers 
                for (int i = 0; i < oddLocatinos.Count; i++)
                {
                    // iterate over list backwards 
                    for (int x = list.Length-1; x >= 0 ; x--)
                    {
                        // if even number and index is less than odd number index , replace the two locations 
                        if (list[x] % 2 == 0 && oddLocatinos[i] > x)
                        {
                            temp = list[x];
                            list[x] = list[oddLocatinos[i]];
                            list[oddLocatinos[i]] = temp;
                        }
                    }
                }
                
                
            }

            return list;



        }

        

        public List<string> ValidatePracets(string[] values)
        {

            
            
            var valueStatuses = new List< string>();

            if (values != null && values.Length > 0)
            {
                
                var openOccurrences = new Stack<char>();

                for (int i = 0; i < values.Length; i++)
                {
                    // initiate currnet value as valid 
                    valueStatuses.Add ( "true");
                    var value = values[i];
                    // iterate over current value
                    for (int x = 0; x < value.Length; x++)
                    {
                        //check if open brace, add it to stack 
                        if (value[x].Equals('{') || value[x].Equals('[') || value[x].Equals('('))
                            openOccurrences.Push(value[x]);

                        
                        else if (value[x].Equals(']') || value[x].Equals('}') || value[x].Equals(')'))
                        {
                            //  if close brace , check if no items in stack set current     
                            if (openOccurrences.Count == 0)
                            {
                                valueStatuses[i] = "false";
                                break;
                            }

                            //check the braces if dont match mark value as invalide 
                            var currentOpenBrace = openOccurrences.Pop();
                            if (!(currentOpenBrace == '{' && value[x] == '}' || currentOpenBrace == '[' && value[x] == ']'
                                || currentOpenBrace == '(' && value[x] == ')'))
                            {
                                valueStatuses[i] = "false";
                                break;
                            }
                        }

                    }


                }
            }

            return valueStatuses;

        }



        [HttpPost("[action]")] 
        public IEnumerable<int> GetMostCommonNumber(int[] arr)
        {
            int[] result = new int[2] { 0,0};
            // mark common numbers with a marking list 
            Dictionary<int, int> markList = new Dictionary<int, int>();

            for (int i = 0; i < arr.Length; i++)
            {
                if (markList.Keys.Contains<int>(arr[i]))
                    markList[arr[i]] += 1;
                else
                    markList.Add(arr[i], 1);

            }

            
            Hashtable hashTable = new Hashtable();

            HashSet<int> hashSet = new HashSet<int>();
            
                // get the biggest ranked number in the list 
                foreach  (KeyValuePair<int,int> item in markList)
            {
                Stack<int> stack = new Stack<int>();
                Queue<int> queue = new Queue<int>();
                List<int> lst= new List<int>();
                

                if (item.Value > result[1])
                {
                    result[0] = item.Key;
                    result[1]= item.Value;
                }

            }


            return result;
        }
    }
}