<template>
  <div class="main">
    <md-toolbar>
      <h1 class="md-title header-title" style="flex: 1;">{{roomTitle}}</h1>
      <router-link tag="md-button" to="/">나가기</router-link>
    </md-toolbar>
    <md-layout md-row class="layout-room">
      <md-layout md-hide-xsmall md-hide-small md-flex-medium="5" md-flex-large="10" md-flex-xlarge="15"></md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="90" md-flex-large="80" md-flex-xlarge="70"
                 class="layout-task">
        <md-card md-with-hover class="card-userview">
          <md-card-header>
            <div class="card-header-flex">
              <h1 style="flex: 1;">현재 작업</h1>
              <div class="card-header-flex-buttons">
                <div class="button-with-h1">
                  <md-button class="md-raised md-primary button-between-button" @click="changeUrlLink">
                    <md-icon class="button-icon">done</md-icon>&nbsp;링크 변경
                  </md-button>
                </div>
                <div class="button-with-h1">
                  <md-button class="md-raised md-primary" @click="onClickAddVote">
                    <md-icon class="button-icon">add</md-icon>&nbsp;질문 추가
                  </md-button>
                </div>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <div class="card-header-flex">
              <h3 class="h3-left-text">현재 링크</h3>
              <md-input-container md-clearable>
                <label>PDF URL...</label>
                <md-input v-model="currentUrl"></md-input>
              </md-input-container>
            </div>
            <md-card md-with-hover class="card-inner" v-if="extendAddVote">
              <md-card-header>
                <div class="card-header-flex">
                  <h3 class="h3-left-text">질문 추가 (찬성/반대)</h3>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="card-header-flex">
                  <h3 class="h3-left-text" style="min-width: 110px!important;">질문</h3>
                  <md-input-container md-clearable>
                    <label>질문</label>
                    <md-input v-model="newVoteName"></md-input>
                  </md-input-container>
                </div>
                <div class="card-header-flex">
                  <div style="flex: 1;"></div>
                  <md-button class="md-raised md-primary btn" :class="{disabled: (newVoteName === '')}"
                             @click="onClickAddVoteConfirm">추가
                  </md-button>
                  <md-button class="md-raised md-accent" @click="onClickAddVoteCancel">취소</md-button>
                </div>
              </md-card-content>
            </md-card>
            <md-card md-with-hover class="card-inner" v-if="onVote === 1">
              <md-card-header>
                <div class="card-header-flex">
                  <div class="card-header-flex" style="flex: 1;">
                    <h2>{{voteQuestion}}&nbsp;&nbsp;</h2>
                    <h3 class="vote-result-none"><b>진행 중</b></h3>
                  </div>
                  <!-- v-loading.fullscreen="finishVoteLoading" -->
                  <md-button class="md-raised md-accent" @click="finishOnVote">
                    투표 종료
                  </md-button>
                </div>
                <h3 class="gap-closer">현재 {{currentVote.total}}명 중 {{currentVote.now}}명 투표</h3>
                <h3 class="gap-closer">left: {{voteLeftStr}}</h3>
              </md-card-header>
            </md-card>
            <md-card md-with-hover class="card-inner" v-if="onVote === 2">
              <md-card-header>
                <div class="card-header-flex">
                  <h2>{{pastVotes[0].voteQuestion}}&nbsp;&nbsp;</h2>
                  <div style="min-width: 80px; width: 80px;">
                    <h3 v-if="pastVotes[0].result==='agree'" class="vote-result-yes"><b>찬성</b></h3>
                    <h3 v-else-if="pastVotes[0].result==='none'" class="vote-result-none"><b>무효</b></h3>
                    <h3 v-else class="vote-result-no"><b>반대</b></h3>
                  </div>
                </div>
                <div class="vote-information-h3">
                  <h3 class="gap-closer">총 {{pastVotes[0].total}}명 중&nbsp;</h3>
                  <h3 class="gap-closer">찬성 {{pastVotes[0].agree}}, 반대 {{pastVotes[0].disagree}}, 기권 {{pastVotes[0].none}}</h3>
                </div>
              </md-card-header>
            </md-card>
          </md-card-content>
        </md-card>
      </md-layout>
      <md-layout md-hide-xsmall md-hide-small md-flex-medium="5" md-flex-large="10" md-flex-xlarge="15"></md-layout>
    </md-layout>
    <md-layout md-row class="layout-room">
      <md-layout md-hide-xsmall md-hide-small md-flex-medium="5" md-flex-large="10" md-flex-xlarge="15"></md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="90" md-flex-large="80" md-flex-xlarge="70">
        <md-layout md-column-xsmall md-column-small md-row-medium md-row-large md-row-xlarge>
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50" md-flex-large="50" md-flex-xlarge="50"
                     class="layout-user">
            <md-card md-with-hover class="card-userview">
              <md-card-header>
                <div class="card-header-flex">
                  <h1>유저 목록</h1>
                  <div class="button-with-h1">
                    <md-button class="md-raised md-primary" @click="onClickAddUser">
                      <md-icon class="button-icon">add</md-icon>&nbsp;유저 추가
                    </md-button>
                  </div>
                </div>
              </md-card-header>
              <md-card-content>
                <md-card md-with-hover class="card-inner" v-if="extendAddUser">
                  <md-card-header>
                    <md-input-container md-clearable>
                      <label>이름 입력...</label>
                      <md-input v-model="newUserName"></md-input>
                    </md-input-container>
                  </md-card-header>
                  <md-card-content>
                    <div class="card-header-flex">
                      <div style="flex: 1;"></div>
                      <md-button class="md-raised md-primary btn" :class="{disabled: (newUserName === '')}"
                                 @click="onClickAddUserConfirm">추가
                      </md-button>
                      <md-button class="md-raised md-accent" @click="onClickAddUserCancel">취소</md-button>
                    </div>
                  </md-card-content>
                </md-card>

                <div class="card-header-flex">
                  <h2>{{userCount}}명 중 {{activeUserCount}}명 활성화</h2>
                </div>
                <md-table>
                  <md-table-header>
                    <md-table-row>
                      <md-table-head>User</md-table-head>
                      <md-table-head>UniqueCode</md-table-head>
                      <md-table-head>active?</md-table-head>
                      <md-table-head>delete?</md-table-head>
                    </md-table-row>
                  </md-table-header>
                  <md-table-body>
                    <md-table-row v-for="(row, rowIndex) in userList" :key="rowIndex"
                                  :md-item="{ key: rowIndex, info: row }">
                      <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex">
                        {{column}}
                      </md-table-cell>
                      <md-table-cell>
                        <md-button class="md-icon-button md-accent" @click="() =>{ onChangeRoleUser(rowIndex); }">
                          <md-icon v-if="userStatus[rowIndex] === 0">favorite_border</md-icon>
                          <md-icon v-else>favorite</md-icon>
                        </md-button>
                      </md-table-cell>
                      <md-table-cell>
                        <md-button class="md-icon-button md-accent" @click="() =>{ onDeleteUser(rowIndex); }">
                          <md-icon>clear</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table-body>
                </md-table>
              </md-card-content>
            </md-card>
          </md-layout>
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50" md-flex-large="50" md-flex-xlarge="50"
                     class="layout-result">
            <md-card md-with-hover class="card-userview">
              <md-card-header>
                <div class="card-header-flex">
                  <h1>이전 결과</h1>
                </div>
              </md-card-header>
              <md-card-content>
                <md-card md-with-hover class="card-inner" v-for="pastVote in pastVotes" :key="pastVote.voteQuestion">
                  <md-card-header>
                    <div class="card-header-flex">
                      <h2>{{pastVote.voteQuestion}}&nbsp;&nbsp;</h2>
                      <div style="min-width: 80px; width: 80px;">
                        <h3 v-if="pastVote.result==='agree'" class="vote-result-yes"><b>찬성</b></h3>
                        <h3 v-else-if="pastVote.result==='none'" class="vote-result-none"><b>무효</b></h3>
                        <h3 v-else class="vote-result-no"><b>반대</b></h3>
                      </div>
                    </div>
                    <div class="vote-information-h3">
                      <h3 class="gap-closer">총 {{pastVote.total}}명 중&nbsp;</h3>
                      <h3 class="gap-closer">찬성 {{pastVote.agree}}, 반대 {{pastVote.disagree}}, 기권 {{pastVote.none}}</h3>
                    </div>
                  </md-card-header>
                </md-card>
              </md-card-content>
            </md-card>
          </md-layout>
        </md-layout>
      </md-layout>
      <md-layout md-hide-xsmall md-hide-small md-flex-medium="5" md-flex-large="10" md-flex-xlarge="15"></md-layout>
    </md-layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        extendAddVote: false,
        extendAddUser: false,
        newVoteName: '',
        newUserName: '',
        roomInfo: this.roomInfo,
        userList: this.userList,
        userStatus: this.userStatus,
        userCountText: this.userCountText,

        onVote: this.onVote,
        voteQuestion: this.voteQuestion,
        currentVote: this.currentVote,
        pastVote: [],
        finishVoteLoading: false,
        voteLeft: this.voteLeft,

        currentUrl: this.currentUrl,
        roomTitle: this.roomTitle,

        pastVotes: this.pastVotes,
      };
    },
    beforeCreate () {
      console.log('Welcome!');
      this.roomInfo = undefined;
      this.userList = [];
      this.userStatus = [];
      this.activeUserCount = 0;
      this.userCount = 0;
      this.isFirst = true;
      this.currentUrl = '';
      this.roomTitle = '';
      this.onVote = 0;
      this.voteQuestion = '';
      this.currentVote = { now: -1, total: -1 };
      this.voteLeft = [];
      this.pastVotes = [];
      this.$socket.emit('verifyRoom', this.$route.params.roomId);
      this.$socket.emit('getPastResults', this.$route.params.roomId);
    },
    sockets: {
      verifyRoomSuccess (data) {
        this.roomInfo = data.room;
        this.userList = [];
        this.userStatus = [];
        this.activeUserCount = 0;
        this.userCount = this.roomInfo.user.length;
        this.onVote = this.roomInfo.voting;
        if (this.onVote > 0) {
          this.extendAddVote = false;
          this.voteQuestion = this.roomInfo.voteQuestion;
          this.newVoteName = '';
        } else {
          this.currentVote = { now: -1, total: -1 };
          this.voteLeft = [];
        }
        if (this.isFirst) {
          this.isFirst = false;
          this.currentUrl = data.room.showUrl;
        }
        this.roomTitle = data.room.name;
        for (let i = 0; i < this.roomInfo.user.length; i += 1) {
          this.userList.push({ name: this.roomInfo.user[i].name, code: this.roomInfo.user[i].code });
          this.userStatus.push(this.roomInfo.user[i].vote_status);
          if (this.roomInfo.user[i].vote_status > 0) this.activeUserCount += 1;
        }
        setTimeout(() => {
          this.$socket.emit('verifyRoom', this.$route.params.roomId);
        }, 200);
      },
      verifyRoomFailed () {
        this.$router.push('/');
      },
      addVoteSuccess () {
        this.$message({
          showClose: true,
          message: 'Successfully added vote',
          type: 'success',
        });
      },
      addVoteFailed (data) {
        if (data.message) {
          this.extendAddVote = false;
          this.newVoteName = '';
          this.$message({
            showClose: true,
            message: data.message,
            type: 'error',
          });
        } else {
          this.$message({
            showClose: true,
            message: 'Failed to add vote',
            type: 'error',
          });
        }
      },
      realTimeCurrentVote (data) {
        this.currentVote = {
          now: data.currentVote.now,
          total: data.currentVote.total,
        };
        this.voteLeft = data.voteLeft;
      },
      resultVote (data) {
        this.pastVotes = data.pastResult;
      },
      finishOnVoteSuccess () {
        // pastVote에 추가
        this.finishVoteLoading = false;
        this.$message({
          showClose: true,
          message: 'Successfully finished vote',
          type: 'success',
        });
      },
      finishOnVoteFailed () {
        this.$message({
          showClose: true,
          message: 'Failed to finish vote',
          type: 'error',
        });
      },
      userAddSuccess (newCode) {
        this.$message({
          showClose: true,
          message: 'Successfully added user',
          type: 'success',
        });
        this.newUserName = '';
        this.extendAddUser = !this.extendAddUser;
        console.log(`newCode is ${newCode}`);
      },
      userAddFailed () {
        this.$message({
          showClose: true,
          message: 'Failed to add user',
          type: 'error',
        });
        console.log('failed to add user');
      },
    },
    computed: {
      voteLeftStr () {
        // console.log(this.voteLeft);
        let retStr = '';
        for (let i = 0; i < this.voteLeft.length; i += 1) {
          if (i === 0) retStr = this.voteLeft[0];
          else {
            retStr += ', ';
            retStr += this.voteLeft[i];
          }
        }
        return retStr;
      },
    },
    methods: {
      onClickAddVote () {
        console.log('!!!');
        this.extendAddVote = !this.extendAddVote;
      },
      /*
      voteLeftStr2 () {
        // console.log(this.voteLeft);
        let retStr = '';
        for (let i = 0; i < this.voteLeft.length; i += 1) {
          if (i === 0) retStr = this.voteLeft[0];
          else {
            retStr += ', ';
            retStr += this.voteLeft[i];
          }
        }
        // console.log(retStr);
        return retStr;
      }, */
      onClickAddVoteConfirm () {
        if (this.newVoteName !== '') {
          console.log(this.$route.params.roomId);
          this.$socket.emit('addVote', {
            roomId: this.$route.params.roomId,
            question: this.newVoteName,
          });
        }
      },
      onClickAddVoteCancel () {
        this.newVoteName = '';
        this.extendAddVote = !this.extendAddVote;
      },
      finishOnVote () {
        this.finishVoteLoading = true;
        this.$socket.emit('finishOnVote', {
          roomId: this.$route.params.roomId,
        });
      },
      onClickAddUser () {
        console.log(this.$route.params.roomId);
        this.extendAddUser = !this.extendAddUser;
      },
      onClickAddUserConfirm () {
        if (this.newUserName !== '') {
          console.log(this.$route.params.roomId);
          this.$socket.emit('createUser', {
            roomId: this.$route.params.roomId,
            userName: this.newUserName,
          });
        }
      },
      onClickAddUserCancel () {
        this.newUserName = '';
        this.extendAddUser = !this.extendAddUser;
      },
      onChangeRoleUser (idx) {
        console.log('!');
        this.$socket.emit('changeUserRole', this.$route.params.roomId, this.userList[idx].code);
      },
      onDeleteUser (idx) {
        this.$socket.emit('deleteUser', this.$route.params.roomId, this.userList[idx].code);
      },
      changeUrlLink () {
        this.$socket.emit('changeLink', this.$route.params.roomId, this.currentUrl);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    text-align: left;
    min-height: 100vh;
    background-color: #757de8;
  }

  .layout-task, .layout-user, .layout-result {
    padding: 10px;
    margin-top: 20px;
  }

  .md-card {
    width: 100%;
  }

  @media (max-width: 944px) {
    .md-flex-small-100 {
      min-width: 100%;
    }

    .header-title {
      visibility: hidden;
    }
  }

  @media (max-width: 600px) {
    .md-column-xsmall {
      flex-direction: row;
    }

    .header-title {
      visibility: hidden;
    }
  }

  .card-header-flex {
    display: flex;
    align-items: center;
  }

  .card-header-flex-buttons {
    display: flex;
    align-items: center;
  }

  .vote-information-h3 {
    display: flex;
  }

  @media (max-width: 600px) {
    .card-header-flex-buttons {
      display: block;
    }

    .button-between-button {
      margin-bottom: 5px !important;
    }

    .vote-information-h3 {
      display: block;
    }
  }

  .button-with-h1 {
    margin-left: 10px;
  }

  .button-icon {
    margin-top: -2px;
    margin-left: -5px;
  }

  .card-inner {
    background-color: #DDDDDD !important;
    margin-bottom: 10px;
  }

  .vote-result-yes {
    color: #00AA00;
    text-align: right;
    min-width: 80px;
  }

  .vote-result-no {
    color: #FF0000;
    text-align: right;
    min-width: 80px;
  }

  .vote-result-none {
    color: #777777;
    text-align: right;
    min-width: 80px;
  }

  .gap-closer {
    margin-top: -5px;
  }

  .h3-left-text {
    margin-top: 10px;
    min-width: 125px;
  }

  .md-table {
    max-width: 100% !important;
  }
</style>
