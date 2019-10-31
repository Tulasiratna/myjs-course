
var JohnTeamScore = 89+120+103;
var MikeTeamScore = 116+94+123;
var MaryTeamScore = 97+134+105;

console.log(JohnTeamScore, MikeTeamScore, MaryTeamScore);

var JhonAverageScore = (89+120+103)/3;
var MikeAverageScore = (116+94+123)/3;
var MaryAverageScore = (97+134+105)/3;

console.log(JhonAverageScore, MikeAverageScore, MaryAverageScore);

        // if (JhonAverageScore > MikeAverageScore) {
        //   console.log('John\'s team wins with' + ' ' +JhonAverageScore + ' ' +'points' );
        // } else if (MikeAverageScore > JhonAverageScore) {
        //   console.log('Mike\'s team wins with' + ' ' +MikeAverageScore + ' ' +'points' );
        // } else {
        //   console.log('There is a draw');
        // }

        if (JhonAverageScore > MikeAverageScore && JhonAverageScore > MaryAverageScore) {
          console.log('John\'s team wins with' + ' ' + JhonAverageScore + ' ' + 'points' );
        } else if (MikeAverageScore > JhonAverageScore && MikeAverageScore > MaryAverageScore) {
          console.log('Mike\'s team wins with' + ' ' + MikeAverageScore + ' ' + 'points' );
        } else if (MaryAverageScore > JhonAverageScore && MaryAverageScore > MikeAverageScore) {
          console.log('Mary\'s team wins with' + ' ' + MaryAverageScore + ' ' + 'points' );
        } else {
          console.log('There is a draw');
        }


